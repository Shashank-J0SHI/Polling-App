using Microsoft.AspNetCore.SignalR;
using System.Timers;
using Polling_App.Models;
using System.Xml.Schema;
using System.Xml.Serialization;
using System.Collections.Concurrent;

namespace Polling_App.WsHubs
{
    public class UserWsHub : Hub
    {
        private static System.Timers.Timer? serverClock;
        private static System.Timers.Timer? aTimer;
        private static System.Timers.Timer? bTimer;
        private static IHubCallerClients? _clients;

        private static bool change = false;

        public static bool validity = false;
        public static bool clock_running = false;
        public static uint connCount = 0;
        public static uint adminCount = 0;
        public static uint time = 0;

        public static int[] a;
        public static uint[] option_arr = { 0, 0, 0, 0 };
        
        public static ConcurrentBag<string> adminIds = ["0"];
        public static ConcurrentBag<string> clientIds = ["0"];
        public static ConcurrentDictionary<string, List<string>> aDict = new ConcurrentDictionary<string, List<string>>(StringComparer.OrdinalIgnoreCase);

        private static void ClockStart()
        {
            serverClock = new System.Timers.Timer();
            serverClock.Interval = 1000;
            serverClock.Elapsed += OnTick;
            serverClock.AutoReset = true;
            serverClock.Enabled = true;
        }

        public static void Interval()
        {
            aTimer = new System.Timers.Timer();
            aTimer.Interval = 1000;
            aTimer.Elapsed += OnInterval;
            aTimer.AutoReset = true;
            aTimer.Enabled = true;
        }

        public static void Timeout()
        {
            bTimer = new System.Timers.Timer(1000);
            bTimer.Elapsed += OnTimeout;
            bTimer.AutoReset = true;
            bTimer.Enabled = true;
        }

        public static async void OnTick(Object source, ElapsedEventArgs e)
        {
            if (change)
            {
                await _clients.Group("admins").SendAsync("Count", option_arr, connCount - adminCount);
                change = false;
            }
        }

        public static void OnInterval(Object source, ElapsedEventArgs e)
        {
            time -= 1;
            if (time == 0)
            {
                aTimer.Stop();
                aTimer.Dispose();
                Timeout();
            }
        }

        public static async void OnTimeout(Object source, ElapsedEventArgs e)
        {
            bTimer.Stop();
            bTimer.Dispose();
            time = 0;
            validity = false;
            await _clients.All.SendAsync("Msg", false, 0);
        }

        public static async void Notify(bool poll)
        {
            await _clients.All.SendAsync("Msg", poll, time);
        }

        public async Task Admin(bool poll, string crnt)
        {
            if (validity != poll)
            {
                validity = poll;

                if (poll)
                {
                    time = 15;
                    option_arr = [ 0, 0, 0, 0 ];
                    Interval();
                }
                else
                {
                    time = 0;
                    aTimer.Stop();
                    aTimer.Dispose();
                }

                Notify(poll);
            }
        }

        public async Task Admin_Connected()
        {
            string local = Context.ConnectionId;
            var tempvar = Groups.AddToGroupAsync(local, "admins");

            if (!adminIds.Contains(local))
            {
                adminIds.Add(local);
                Interlocked.Increment(ref adminCount);
            }
        }

        public async Task Admin_Create()
        {

        }

        public async Task Admin_Delete(int[] arr)
        {

        }

        public async Task Admin_Reorder()
        {

        }

        public async Task User(int option)
        {
            if (validity)
            {
                if (!change)
                {
                    change = true;
                }

                Interlocked.Increment(ref option_arr[option]);
            }
        }

        public async Task User_Love(string userkey, string teamid, bool state)
        {
            if (clientIds.Contains(userkey))
            {
                aDict.TryAdd(userkey, []);
                bool local = aDict[userkey].Contains(teamid);
                if (state && !local)
                {
                    aDict[userkey].Add(teamid);
                }
                else if (local)
                {
                    aDict[userkey].Remove(teamid);
                }
            }
            else
            {
                
            }
        }

        public async Task CatchUp(string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("Msg", validity, time);
        }

        public override Task OnConnectedAsync()
        {
            if (!clock_running)
            {
                ClockStart();
                clock_running = true;
            }

            _clients = Clients;
            System.Timers.Timer timer = new System.Timers.Timer(1000);
            timer.Elapsed += incrementConn;
            timer.Enabled = true;

            return base.OnConnectedAsync();

            void incrementConn(Object source, ElapsedEventArgs e)
            {
                Interlocked.Increment(ref connCount);
                change = true;
                timer.Close();
            }
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            string local = Context.ConnectionId;
            Interlocked.Decrement(ref connCount);
            
            if (adminIds.Contains(local))
            {
                Interlocked.Decrement(ref adminCount);
            }

            change = true;
            return base.OnDisconnectedAsync(exception);
        }
    }
}

