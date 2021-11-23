import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems,
  // DrawerNavigatorItems
  // createAppContainer
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform, SafeAreaView, View,Button  } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import CardScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductsScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import Colors from "../constants/Colors";

import * as authActions from "../store/actions/auth";


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
  },
  contentComponent: props => {
    const dispatch = useDispatch();
    return <View style={{flex:1, padding:20}}>
      <SafeAreaView forceInset={{top: "always", horizontal: "never"}}>
        <DrawerItems {...props} />
        <Button 
          title="Logout"
          color={Colors.primary}
          onPress={() => {
            dispatch(authActions.logout());
            // props.navigation.navigate("Auth");
          }}
        />
      </SafeAreaView>
    </View>
  }
})

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions:defaultsNavOptions
})

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth:AuthNavigator,
  Shop:ShopNavigator,
})

export default createAppContainer(MainNavigator);
