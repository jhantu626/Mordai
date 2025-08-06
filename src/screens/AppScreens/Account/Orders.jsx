import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { DottedDivider, SecondaryHeader } from '../../../components';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import { useNavigation } from '@react-navigation/native';

const Orders = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  // Mock orders data - replace with actual API call
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      date: '2024-08-05',
      status: 'delivered',
      statusText: 'Delivered',
      items: [
        { name: 'Organic Apples', price: 150, quantity: 2, image: 'apple.jpg' },
        { name: 'Fresh Bananas', price: 80, quantity: 1, image: 'banana.jpg' }
      ],
      totalAmount: 380,
      shippingCharge: 19,
      grandTotal: 399,
      deliveryAddress: {
        name: 'John Doe',
        phone: '+91 9876543210',
        address: '123 Main Street, Building A, Downtown Area, Mumbai - 400001'
      },
      paymentMethod: 'Online Payment',
      deliveredDate: '2024-08-05',
      trackingId: 'TRK123456789'
    },
    {
      id: 'ORD002',
      date: '2024-08-06',
      status: 'in_transit',
      statusText: 'In Transit',
      items: [
        { name: 'Fresh Vegetables Mix', price: 200, quantity: 1, image: 'vegetables.jpg' },
        { name: 'Organic Rice', price: 300, quantity: 1, image: 'rice.jpg' }
      ],
      totalAmount: 500,
      shippingCharge: 25,
      grandTotal: 525,
      deliveryAddress: {
        name: 'John Doe',
        phone: '+91 9876543210',
        address: '123 Main Street, Building A, Downtown Area, Mumbai - 400001'
      },
      paymentMethod: 'Cash on Delivery',
      expectedDelivery: '2024-08-07',
      trackingId: 'TRK987654321'
    },
    {
      id: 'ORD003',
      date: '2024-08-04',
      status: 'cancelled',
      statusText: 'Cancelled',
      items: [
        { name: 'Premium Mangoes', price: 400, quantity: 1, image: 'mango.jpg' }
      ],
      totalAmount: 400,
      shippingCharge: 20,
      grandTotal: 420,
      deliveryAddress: {
        name: 'John Doe',
        phone: '+91 9876543210',
        address: '123 Main Street, Building A, Downtown Area, Mumbai - 400001'
      },
      paymentMethod: 'Online Payment',
      cancelledDate: '2024-08-04',
      cancelReason: 'Customer requested cancellation'
    }
  ]);

  const tabs = [
    { id: 'all', title: 'All Orders' },
    { id: 'delivered', title: 'Delivered' },
    { id: 'in_transit', title: 'In Transit' },
    { id: 'cancelled', title: 'Cancelled' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50';
      case 'in_transit':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      case 'pending':
        return '#2196F3';
      default:
        return '#666666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return '✅';
      case 'in_transit':
        return '🚚';
      case 'cancelled':
        return '❌';
      case 'pending':
        return '⏳';
      default:
        return '📦';
    }
  };

  const filteredOrders = selectedTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedTab);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleOrderPress = (order) => {
    // Navigate to order details screen
    navigation.navigate('OrderDetails', { orderId: order.id });
  };

  const handleTrackOrder = (order) => {
    // Navigate to order tracking screen
    navigation.navigate('OrderTracking', { orderId: order.id, trackingId: order.trackingId });
  };

  const renderOrderItem = ({ item: order }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => handleOrderPress(order)}
      activeOpacity={0.8}
    >
      {/* Order Header */}
      <View style={styles.orderHeader}>
        <View style={styles.orderHeaderLeft}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          <Text style={styles.statusIcon}>{getStatusIcon(order.status)}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.statusText}
          </Text>
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Items:</Text>
          <Text style={styles.summaryValue}>{order.items.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Grand Total:</Text>
          <Text style={styles.summaryTotal}>₹{order.grandTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* Order Actions */}
      <View style={styles.orderActions}>
        {order.status === 'in_transit' && (
          <TouchableOpacity 
            style={styles.trackButton}
            onPress={() => handleTrackOrder(order)}
          >
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>
        )}
        {order.status === 'delivered' && (
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.reorderButtonText}>Reorder</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={styles.viewDetailsButton}
          onPress={() => handleOrderPress(order)}
        >
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyTitle}>No Orders Found</Text>
      <Text style={styles.emptyText}>
        {selectedTab === 'all' 
          ? "You haven't placed any orders yet. Start shopping to see your orders here!"
          : `No ${selectedTab.replace('_', ' ')} orders found.`
        }
      </Text>
      <TouchableOpacity 
        style={styles.shopNowButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.shopNowButtonText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Layout>
      <SecondaryHeader title="My Orders" />
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                selectedTab === tab.id && styles.selectedTabButton
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text style={[
                styles.tabButtonText,
                selectedTab === tab.id && styles.selectedTabButtonText
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </Layout>
  );
};

export default Orders;

const styles = StyleSheet.create({
  // Tabs Styles
  tabsContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabsScrollContainer: {
    paddingHorizontal: 0,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedTabButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#666666',
  },
  selectedTabButtonText: {
    color: '#FFFFFF',
  },

  // Orders Container
  ordersContainer: {
    marginTop: 30,
    paddingBottom: 30,
    flexGrow: 1,
    gap: 5
  },

  // Order Card Styles
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 0.5,
  },

  // Order Header
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#000000',
  },
  orderDate: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#666666',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  statusIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
  },

  // Items Container
  itemsContainer: {
    marginVertical: 10,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemImageContainer: {
    marginRight: 12,
  },
  itemImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImageText: {
    fontSize: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000000',
  },
  itemPrice: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#666666',
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#000000',
  },

  // Order Summary
  orderSummary: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000000',
  },
  summaryTotal: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.primary,
  },

  // Order Actions
  orderActions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  trackButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#FFFFFF',
  },
  reorderButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#FFFFFF',
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  viewDetailsButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: '#000000',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopNowButtonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#FFFFFF',
  },
});