import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

interface Booking {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  travelDate: string;
  groupSize: number;
  status: string;
  createdAt: string;
  tour: {
    name: string;
    price: number;
  };
}

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Tour</TableHead>
              <TableHead>Travel Date</TableHead>
              <TableHead>Group Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{booking.firstName} {booking.lastName}</div>
                    <div className="text-sm text-gray-500">{booking.email}</div>
                  </div>
                </TableCell>
                <TableCell>{booking.tour?.name || 'N/A'}</TableCell>
                <TableCell>{booking.travelDate}</TableCell>
                <TableCell>{booking.groupSize}</TableCell>
                <TableCell>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookingManagement;