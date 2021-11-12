import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import CardScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductsScreen from "../screens/user/EditProductScreen";

import Colors from "../constants/Colors";


const defaultsNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
},

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CardScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons 
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23} 
          color={drawerConfig.tintColor}

        />
      )
    },
    defaultNavigationOptions: defaultsNavOptions
  },
  
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  }, 
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons 
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23} 
          color={drawerConfig.tintColor}

        />
      )
    },
    defaultNavigationOptions: defaultsNavOptions
  }
);


const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductsScreen
  }, 
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons 
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23} 
          color={drawerConfig.tintColor}

        />
      )
    },
    defaultNavigationOptions: defaultsNavOptions
  }
);

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator
}, {
  contentOptions : {
    activeTintColor: Colors.primary
  }
})

export default createAppContainer(ShopNavigator);
