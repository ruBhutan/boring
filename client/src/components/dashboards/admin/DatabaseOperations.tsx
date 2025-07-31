import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Alert, AlertDescription } from '../../ui/alert';
import { Database, RefreshCw, Trash2, Upload, Download } from 'lucide-react';

const DatabaseOperations: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleSeedDatabase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage(`Database seeded successfully! Created ${data.tours} tours, ${data.tourOperators} operators, ${data.testimonials} testimonials, and ${data.blogPosts} blog posts.`, 'success');
      } else {
        showMessage(data.message || 'Failed to seed database', 'error');
      }
    } catch (error) {
      showMessage('Error seeding database', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    if (!confirm('Are you sure you want to clear all data? This action cannot be undone!')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/clear-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage('Database cleared successfully!', 'success');
      } else {
        showMessage(data.message || 'Failed to clear database', 'error');
      }
    } catch (error) {
      showMessage('Error clearing database', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <Alert className={messageType === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <AlertDescription className={messageType === 'success' ? 'text-green-800' : 'text-red-800'}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seed Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Populate the database with sample data including tours, operators, testimonials, and blog posts.
                  This will create comprehensive test data for the platform.
                </p>
                <Button 
                  onClick={handleSeedDatabase} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Seeding Database...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Seed Database
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-600">Clear Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Remove all data from the database. This action is irreversible and will delete all tours, 
                  bookings, users, and other data.
                </p>
                <Button 
                  onClick={handleClearDatabase} 
                  disabled={isLoading}
                  variant="destructive"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Clearing Database...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Database
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Database Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Tours</p>
                  <p className="text-gray-600">Tour packages and itineraries</p>
                </div>
                <div>
                  <p className="font-medium">Operators</p>
                  <p className="text-gray-600">Tour operator companies</p>
                </div>
                <div>
                  <p className="font-medium">Guides</p>
                  <p className="text-gray-600">Registered guides and drivers</p>
                </div>
                <div>
                  <p className="font-medium">Bookings</p>
                  <p className="text-gray-600">Customer reservations</p>
                </div>
                <div>
                  <p className="font-medium">Hotels</p>
                  <p className="text-gray-600">Accommodation options</p>
                </div>
                <div>
                  <p className="font-medium">Festivals</p>
                  <p className="text-gray-600">Cultural events and festivals</p>
                </div>
                <div>
                  <p className="font-medium">Testimonials</p>
                  <p className="text-gray-600">Customer reviews and feedback</p>
                </div>
                <div>
                  <p className="font-medium">Blog Posts</p>
                  <p className="text-gray-600">Travel articles and content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">1. Seed Database</p>
                  <p className="text-gray-600">Use this to populate your database with comprehensive sample data for testing and demonstration purposes.</p>
                </div>
                <div>
                  <p className="font-medium">2. Clear Database</p>
                  <p className="text-gray-600">Use this to completely reset the database. Only use this when you want to start fresh.</p>
                </div>
                <div>
                  <p className="font-medium">3. Data Management</p>
                  <p className="text-gray-600">After seeding, you can manage individual records through the respective management tabs above.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseOperations;