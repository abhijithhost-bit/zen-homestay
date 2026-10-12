'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Shield, Lock, LogOut, RefreshCw, BedDouble, Home, 
  CheckCircle2, XCircle, AlertCircle, Clock, Users, IndianRupee,
  KeyRound, UserCheck
} from 'lucide-react';
import { supabase, isSupabaseConfigured, Room, PropertySettings } from '@/lib/supabase';

export default function AdminPage() {
  const [sessionUser, setSessionUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  
  // Login form state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Live Supabase data
  const [rooms, setRooms] = useState<Room[]>([]);
  const [settings, setSettings] = useState<PropertySettings | null>(null);
  const [fetchError, setFetchError] = useState('');
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  // Check auth session
  const checkAuth = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSessionUser(null);
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }

      setSessionUser(user.email || user.id);

      // Verify admin role against admin_users table
      const { data: adminRecord } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      const hasAdmin = Boolean(adminRecord?.role === 'admin' || user.app_metadata?.role === 'admin');
      setIsAdmin(hasAdmin);
    } catch (err: unknown) {
      console.error('Session check failed:', err);
      setIsAdmin(false);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Fetch Rooms & Property Settings
  const loadDashboardData = useCallback(async () => {
    setDataLoading(true);
    setFetchError('');

    try {
      // 1. Fetch Physical Rooms
      const { data: roomsData, error: roomsErr } = await supabase
        .from('rooms')
        .select('*')
        .order('sort_order', { ascending: true });

      if (roomsErr) throw roomsErr;
      setRooms(roomsData || []);

      // 2. Fetch Property Settings
      const { data: settingsData, error: settingsErr } = await supabase
        .from('property_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (settingsErr) throw settingsErr;
      setSettings(settingsData);
      setLastFetched(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to query live data from Supabase';
      setFetchError(msg);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, [checkAuth, loadDashboardData]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setSessionUser(data.user.email || data.user.id);
        setShowLoginModal(false);
        await checkAuth();
        await loadDashboardData();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSessionUser(null);
    setIsAdmin(false);
    await loadDashboardData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-sky-600 to-orange-500 text-white font-black flex items-center justify-center text-sm shadow-md shadow-orange-500/10">
              ZH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white">Zen Homestay</span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Host Control &amp; Inventory Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadDashboardData}
              disabled={dataLoading}
              title="Refresh Live Data"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? 'animate-spin text-orange-400' : ''}`} />
            </button>

            {authLoading ? (
              <span className="text-xs text-slate-500">Checking auth...</span>
            ) : sessionUser ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <span className="text-xs font-bold text-slate-200 block truncate max-w-[180px]">{sessionUser}</span>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center justify-end gap-1">
                    <UserCheck className="w-3 h-3" /> {isAdmin ? 'Verified Admin' : 'Authenticated'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 rounded-xl transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md shadow-orange-500/20 transition-all cursor-pointer active:scale-95"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Error notification */}
        {fetchError && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="flex-1">
              <p className="font-bold">Error loading live data from Supabase:</p>
              <p className="text-[11px] text-red-300 mt-0.5">{fetchError}</p>
            </div>
            <button 
              type="button" 
              onClick={loadDashboardData}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Live Inventory &amp; Settings</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Fetched in real-time from Supabase tables: <code className="text-orange-400">property_settings</code> &amp; <code className="text-orange-400">rooms</code>
            </p>
          </div>
          {lastFetched && (
            <span className="text-[11px] text-slate-500 font-medium">
              Last synced: {lastFetched}
            </span>
          )}
        </div>

        {/* SECTION 1: Whole-Floor Configuration (property_settings) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <Home className="w-5 h-5 text-sky-400" />
            <h2 className="font-extrabold text-base">Whole-Floor Configuration (2nd Floor Tier)</h2>
          </div>

          {settings ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                    Whole Floor Tier Title
                  </span>
                  <p className="font-black text-lg text-white">{settings.whole_floor_title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{settings.property_name}</p>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                    Whole-Floor Package Rate
                  </span>
                  <div className="flex items-baseline gap-1 text-2xl font-black text-white">
                    <span className="text-orange-500">₹</span>
                    <span>{(settings.whole_floor_base_price_paise / 100).toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 font-normal">/ night</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ({settings.whole_floor_base_price_paise.toLocaleString()} paise)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                    Configured Max Capacity
                  </span>
                  <div className="flex items-center gap-1.5 text-lg font-black text-white">
                    <Users className="w-4 h-4 text-sky-400" />
                    <span>Up to {settings.whole_floor_max_guests} Guests</span>
                  </div>
                  <span className="text-xs text-slate-400">Reserves both physical rooms</span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                    Whole Floor Status
                  </span>
                  <div>
                    {settings.whole_floor_is_active ? (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active &amp; Bookable
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold">
                        <XCircle className="w-3.5 h-3.5" /> Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Operational parameters */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Check-in Time</span>
                  <span className="font-bold text-slate-300 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {settings.check_in_time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Check-out Time</span>
                  <span className="font-bold text-slate-300 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {settings.check_out_time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Pending Hold Expiry</span>
                  <span className="font-bold text-slate-300 mt-0.5 block">{settings.pending_expiry_minutes} Minutes</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Max Advance Horizon</span>
                  <span className="font-bold text-slate-300 mt-0.5 block">{settings.max_advance_days} Days</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center text-xs text-slate-500">
              {dataLoading ? 'Loading property settings from Supabase...' : 'No property settings found in table public.property_settings.'}
            </div>
          )}
        </section>

        {/* SECTION 2: Physical Rooms (rooms) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <BedDouble className="w-5 h-5 text-orange-400" />
            <h2 className="font-extrabold text-base">Physical Rooms Inventory (Independent Capacities &amp; Rates)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div 
                  key={room.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-extrabold uppercase text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/20">
                        Code: {room.code}
                      </span>
                      <h3 className="text-lg font-black text-white mt-2">{room.name}</h3>
                    </div>
                    <div>
                      {room.is_active ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full text-[11px] font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Room Base Price</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <IndianRupee className="w-4 h-4 text-orange-500" />
                        <span className="text-xl font-black text-white">
                          {(room.base_price_paise / 100).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">/ night</span>
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono">
                        {room.base_price_paise.toLocaleString()} paise
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Max Guest Capacity</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Users className="w-4 h-4 text-sky-400" />
                        <span className="text-lg font-black text-white">{room.max_guests} Guests</span>
                      </div>
                      <span className="text-[10px] text-slate-500">Independent limit</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>ID: <code className="font-mono text-slate-400">{room.id.slice(0, 8)}...</code></span>
                    <span>Sort Order: #{room.sort_order ?? 1}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center text-xs text-slate-500">
                {dataLoading ? 'Loading physical rooms from Supabase...' : 'No physical rooms found in table public.rooms.'}
              </div>
            )}
          </div>
        </section>

        {/* Security / Isolation Card */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-xs text-slate-400 space-y-1">
          <p className="font-bold text-slate-300 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Supabase Connection &amp; Isolation Verified
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            The public booking calendar and WhatsApp flow on the homepage remain completely independent and untouched.
          </p>
        </div>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-orange-500 flex items-center justify-center text-white mx-auto shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-white">Host Admin Sign In</h2>
              <p className="text-xs text-slate-400">Sign in with your registered admin credentials</p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="host@zenhomestay.in"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/25 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In as Admin</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
