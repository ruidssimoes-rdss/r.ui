'use client';

// Re-export React Native components for use in MDX
// These need to be in a client component due to useState/useEffect usage

export {
  Button,
  Switch,
  Input,
  Badge,
  Progress,
  Checkbox,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  Slider,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@r-ui/react-native';

// Re-export React Native primitives via react-native-web
export { View, Text, Pressable } from 'react-native';
