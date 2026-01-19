import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  colors,
} from '@r-ui/react-native';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Declarative: Story = {
  render: () => (
    <View style={{ width: 500 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Inactive</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  ),
};

export const DataDriven: Story = {
  render: () => {
    const data = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    ];

    const columns = [
      { key: 'name', header: 'Name', width: 150 },
      { key: 'email', header: 'Email', width: 200 },
      { key: 'role', header: 'Role', width: 100 },
    ];

    return (
      <View style={{ width: 500 }}>
        <Table data={data} columns={columns} />
      </View>
    );
  },
};

export const WithCustomRender: Story = {
  render: () => {
    const data = [
      { id: 1, name: 'Project Alpha', status: 'active', progress: 75 },
      { id: 2, name: 'Project Beta', status: 'pending', progress: 30 },
      { id: 3, name: 'Project Gamma', status: 'completed', progress: 100 },
    ];

    const columns = [
      { key: 'name', header: 'Project', width: 150 },
      {
        key: 'status',
        header: 'Status',
        width: 120,
        render: (value: string) => (
          <Badge
            variant={value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'secondary'}
          >
            {value}
          </Badge>
        ),
      },
      {
        key: 'progress',
        header: 'Progress',
        width: 100,
        align: 'right' as const,
        render: (value: number) => `${value}%`,
      },
    ];

    return (
      <View style={{ width: 400 }}>
        <Table data={data} columns={columns} />
      </View>
    );
  },
};

export const WithSelectedRow: Story = {
  render: () => (
    <View style={{ width: 500 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice Brown</TableCell>
            <TableCell>Engineering</TableCell>
            <TableCell>Developer</TableCell>
          </TableRow>
          <TableRow selected>
            <TableCell>Charlie Davis</TableCell>
            <TableCell>Design</TableCell>
            <TableCell>Designer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Eve Wilson</TableCell>
            <TableCell>Marketing</TableCell>
            <TableCell>Manager</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <View style={{ width: 500 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead align="center">Quantity</TableHead>
            <TableHead align="right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Widget A</TableCell>
            <TableCell align="center">100</TableCell>
            <TableCell align="right">$9.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Widget B</TableCell>
            <TableCell align="center">50</TableCell>
            <TableCell align="right">$19.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Widget C</TableCell>
            <TableCell align="center">200</TableCell>
            <TableCell align="right">$4.99</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  ),
};

export const WithFixedWidths: Story = {
  render: () => (
    <View style={{ width: 600 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead width={60}>ID</TableHead>
            <TableHead width={200}>Description</TableHead>
            <TableHead width={100}>Category</TableHead>
            <TableHead width={80} align="right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell width={60}>#001</TableCell>
            <TableCell width={200}>Office supplies purchase</TableCell>
            <TableCell width={100}>Supplies</TableCell>
            <TableCell width={80} align="right">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={60}>#002</TableCell>
            <TableCell width={200}>Software subscription</TableCell>
            <TableCell width={100}>Software</TableCell>
            <TableCell width={80} align="right">$299.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <View style={{ width: 500 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <View style={{ padding: 24, alignItems: 'center' }}>
                <Text style={{ color: colors.text.muted }}>No data available</Text>
              </View>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  ),
};
