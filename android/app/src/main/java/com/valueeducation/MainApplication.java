package com.valueeducation;

import android.app.Application;
import android.util.Log;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.walmartreact.ReactOrientationListener.ReactOrientationListener;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.imagepicker.ImagePickerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactApplication;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(      
          new MainReactPackage(),
          new ReactVideoPackage(),
          new ImagePickerPackage(),
          new ReactOrientationListener(),
          new GoogleAnalyticsBridgePackage(),
          new ReactNativeYouTube(),
          new SplashScreenReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
