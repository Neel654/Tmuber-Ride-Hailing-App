import React, { useState, useEffect } from 'react';
import { Car, MapPin, User, Settings, Phone, AlertCircle, CheckCircle, Clock, Search, Filter, MessageSquare, Star, Navigation, CreditCard } from 'lucide-react';

const TmuberApp = () => {
  const [currentView, setCurrentView] = useState('passenger');
  const [rides] = useState([
    { id: 1, from: 'Toronto Metropolitan University', to: 'CN Tower', status: 'completed', date: '2024-05-30', fare: 15.50, driver: 'John D.', rating: 4.8 },
    { id: 2, from: 'Eaton Centre', to: 'Pearson Airport', status: 'completed', date: '2024-05-28', fare: 45.00, driver: 'Sarah M.', rating: 4.9 },
    { id: 3, from: 'Union Station', to: 'Yorkdale Mall', status: 'completed', date: '2024-05-25', fare: 22.75, driver: 'Mike R.', rating: 4.7 },
  ]);

  const [tickets, setTickets] = useState([
    { id: 1, title: 'Payment Failed', category: 'Payment Issue', status: 'Open', priority: 'High', date: '2024-06-05', description: 'Credit card was charged but ride was cancelled. Need immediate refund.', assignee: 'Support Team A' },
    { id: 2, title: 'App Crashes on Login', category: 'App Bug', status: 'In Progress', priority: 'Medium', date: '2024-06-04', description: 'App closes when I try to log in with Facebook authentication.', assignee: 'Tech Team B' },
    { id: 3, title: 'Driver Not Found', category: 'Booking Issue', status: 'Resolved', priority: 'Low', date: '2024-06-03', description: 'Could not find driver for 10 minutes in downtown area.', assignee: 'Support Team A' },
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    category: '',
    priority: 'Medium',
    description: ''
  });

  const [rideBooking, setRideBooking] = useState({
    pickup: 'Toronto Metropolitan University',
    destination: '',
    rideType: 'standard'
  });

  const [ticketFilter, setTicketFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [appStats] = useState({
    totalRides: 1247,
    activeUsers: 89,
    openTickets: 12,
    avgResponseTime: '2.3 hours',
    satisfaction: 4.6
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const addTicket = () => {
    if (newTicket.title && newTicket.category && newTicket.description) {
      const ticket = {
        id: tickets.length + 1,
        ...newTicket,
        status: 'Open',
        date: new Date().toISOString().split('T')[0],
        assignee: 'Support Team A'
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({ title: '', category: '', priority: 'Medium', description: '' });
      showNotification('Support ticket created successfully!');
    }
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
    showNotification(`Ticket #${ticketId} status updated to ${newStatus}`);
  };

  const bookRide = () => {
    if (rideBooking.pickup && rideBooking.destination) {
      showNotification('Looking for nearby drivers...', 'info');
      setTimeout(() => {
        showNotification('Driver found! Your ride will arrive in 5 minutes.');
      }, 2000);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Open': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = ticketFilter === 'all' || ticket.status.toLowerCase() === ticketFilter;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const PassengerView = () => (
    <div className="space-y-6">
      {/* Book a Ride */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-600" />
          Book a Ride
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter pickup location"
                value={rideBooking.pickup}
                onChange={(e) => setRideBooking({...rideBooking, pickup: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <div className="relative">
              <Navigation className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Where to?"
                value={rideBooking.destination}
                onChange={(e) => setRideBooking({...rideBooking, destination: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ride Type</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'standard', name: 'Standard', price: 'Est. $12-18', icon: Car },
                { id: 'comfort', name: 'Comfort', price: 'Est. $15-22', icon: Car },
                { id: 'premium', name: 'Premium', price: 'Est. $20-30', icon: Car }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setRideBooking({...rideBooking, rideType: type.id})}
                  className={`p-3 rounded-lg border-2 transition duration-200 ${
                    rideBooking.rideType === type.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                  <p className="font-medium text-sm">{type.name}</p>
                  <p className="text-xs text-gray-500">{type.price}</p>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={bookRide}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 font-medium shadow-lg"
          >
            Find Driver
          </button>
        </div>
      </div>

      {/* Ride History */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">Recent Rides</h2>
        <div className="space-y-4">
          {rides.map(ride => (
            <div key={ride.id} className="border-l-4 border-green-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{ride.from} → {ride.to}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-gray-600">{ride.date}</p>
                    <p className="text-sm text-gray-600">Driver: {ride.driver}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{ride.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${ride.fare}</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {ride.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Support */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-600" />
          Need Help?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setCurrentView('support')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition duration-200 hover:shadow-md"
          >
            <AlertCircle className="w-6 h-6 text-orange-500 mb-2" />
            <p className="font-medium">Report an Issue</p>
            <p className="text-sm text-gray-600">Get help with your ride</p>
          </button>
          <div className="p-4 border border-gray-200 rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-500 mb-2" />
            <p className="font-medium">Live Chat</p>
            <p className="text-sm text-gray-600">Available 24/7</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <Phone className="w-6 h-6 text-red-500 mb-2" />
            <p className="font-medium">Emergency</p>
            <p className="text-sm text-gray-600">Call: (416) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );

  const SupportView = () => (
    <div className="space-y-6">
      {/* Create New Ticket */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          Report an Issue
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
              <input
                type="text"
                placeholder="Brief description of the issue"
                value={newTicket.title}
                onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newTicket.category}
                onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                <option value="">Select category</option>
                <option value="App Bug">App Bug</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Booking Issue">Booking Issue</option>
                <option value="Account Issue">Account Issue</option>
                <option value="Driver Issue">Driver Issue</option>
                <option value="Safety Concern">Safety Concern</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={newTicket.priority}
              onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Please describe the issue in detail"
              value={newTicket.description}
              onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <button
            onClick={addTicket}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 font-medium shadow-lg"
          >
            Submit Ticket
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "How do I cancel a ride?",
              a: "You can cancel a ride up to 5 minutes after booking without any charges. Go to 'My Rides' and click 'Cancel'."
            },
            {
              q: "Payment was deducted but ride was cancelled?",
              a: "If your payment was charged for a cancelled ride, please report this issue and we'll refund within 3-5 business days."
            },
            {
              q: "App keeps crashing on my phone?",
              a: "Try clearing the app cache or reinstalling the app. If the issue persists, please report a bug with your device details."
            },
            {
              q: "How do I change my payment method?",
              a: "Go to Profile > Payment Methods to add, remove, or set a default payment method."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="font-medium text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Tickets with Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">My Support Tickets</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <select
              value={ticketFilter}
              onChange={(e) => setTicketFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {filteredTickets.map(ticket => (
            <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(ticket.status)}
                  <div>
                    <h3 className="font-medium">#{ticket.id} - {ticket.title}</h3>
                    <p className="text-sm text-gray-600">{ticket.category} • {ticket.date} • {ticket.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{ticket.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{ticket.status}</span>
                {ticket.status !== 'Resolved' && (
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Add Comment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AdminView = () => (
    <div className="space-y-6">
      {/* Enhanced Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rides</p>
              <p className="text-2xl font-bold text-gray-900">{appStats.totalRides}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% this week</p>
            </div>
            <Car className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{appStats.activeUsers}</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% this week</p>
            </div>
            <User className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{appStats.openTickets}</p>
              <p className="text-xs text-red-600 mt-1">↑ 3 new today</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900">{appStats.avgResponseTime}</p>
              <p className="text-xs text-green-600 mt-1">↓ 0.5h improved</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{appStats.satisfaction}</p>
              <p className="text-xs text-green-600 mt-1">↑ 0.2 this month</p>
            </div>
            <Star className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Ticket Management */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Support Ticket Management</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-200">
              Export Data
            </button>
            <button className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition duration-200">
              Bulk Actions
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {tickets.map(ticket => (
            <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(ticket.status)}
                  <div>
                    <h3 className="font-medium">#{ticket.id} - {ticket.title}</h3>
                    <p className="text-sm text-gray-600">{ticket.category} • {ticket.date} • Assigned to: {ticket.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                  <select
                    value={ticket.status}
                    onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{ticket.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                  <button className="text-xs text-green-600 hover:text-green-800 font-medium">Add Note</button>
                </div>
                <span className="text-xs text-gray-500">Last updated: 2h ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Core Services</h3>
            {[
              { name: 'Database Connection', status: 'operational', uptime: '99.9%' },
              { name: 'Payment Gateway', status: 'operational', uptime: '99.8%' },
              { name: 'Maps API', status: 'operational', uptime: '99.7%' },
              { name: 'SMS Notifications', status: 'delayed', uptime: '97.2%' }
            ].map((service, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <span className="font-medium">{service.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({service.uptime} uptime)</span>
                </div>
                <span className={`flex items-center gap-2 ${
                  service.status === 'operational' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {service.status === 'operational' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  {service.status === 'operational' ? 'Operational' : 'Delayed'}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Response Time</span>
                <span className="text-sm font-medium">120ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Connections</span>
                <span className="text-sm font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="text-sm font-medium text-green-600">0.02%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Server Load</span>
                <span className="text-sm font-medium">23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Tmuber</h1>
            </div>
            <nav className="flex gap-6">
              <button
                onClick={() => setCurrentView('passenger')}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  currentView === 'passenger' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="inline w-4 h-4 mr-2" />
                Passenger
              </button>
              <button
                onClick={() => setCurrentView('support')}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  currentView === 'support' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Support
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  currentView === 'admin' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="inline w-4 h-4 mr-2" />
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'passenger' && <PassengerView />}
        {currentView === 'support' && <SupportView />}
        {currentView === 'admin' && <AdminView />}
      </main>
    </div>
  );
};

export default TmuberApp;
