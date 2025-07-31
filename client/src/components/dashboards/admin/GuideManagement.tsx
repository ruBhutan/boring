import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Eye, UserCheck, UserX, Ban } from 'lucide-react';

interface Guide {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenseImageUrl: string;
  registrationType: 'guide' | 'driver';
  specializations: string[];
  status: 'assigned' | 'not_assigned' | 'blacklisted';
  createdAt: string;
}

const GuideManagement: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch('/api/guides');
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGuideStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/guides/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchGuides();
      }
    } catch (error) {
      console.error('Error updating guide status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned':
        return <Badge className="bg-green-100 text-green-800">Assigned</Badge>;
      case 'not_assigned':
        return <Badge variant="secondary">Available</Badge>;
      case 'blacklisted':
        return <Badge variant="destructive">Blacklisted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredGuides = guides.filter(guide => {
    if (filter === 'all') return true;
    if (filter === 'guides') return guide.registrationType === 'guide';
    if (filter === 'drivers') return guide.registrationType === 'driver';
    return guide.status === filter;
  });

  if (isLoading) {
    return <div>Loading guides...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Guide & Driver Management</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              <SelectItem value="guides">Guides Only</SelectItem>
              <SelectItem value="drivers">Drivers Only</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="not_assigned">Available</SelectItem>
              <SelectItem value="blacklisted">Blacklisted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Specializations</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuides.map((guide) => (
              <TableRow key={guide.id}>
                <TableCell className="font-medium">{guide.name}</TableCell>
                <TableCell>
                  <Badge variant={guide.registrationType === 'guide' ? 'default' : 'secondary'}>
                    {guide.registrationType === 'guide' ? 'Guide' : 'Driver'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{guide.email}</div>
                    <div className="text-gray-500">{guide.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {guide.specializations.slice(0, 2).map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {guide.specializations.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{guide.specializations.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(guide.status)}</TableCell>
                <TableCell>{new Date(guide.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(guide.licenseImageUrl, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {guide.status !== 'assigned' && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => updateGuideStatus(guide.id, 'assigned')}
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                    {guide.status === 'assigned' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => updateGuideStatus(guide.id, 'not_assigned')}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    )}
                    {guide.status !== 'blacklisted' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateGuideStatus(guide.id, 'blacklisted')}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    )}
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

export default GuideManagement;