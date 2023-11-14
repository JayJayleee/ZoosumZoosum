package com.zooisland;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.view.KeyEvent; // <--- import
import com.github.kevinejohn.keyevent.KeyEventModule; // <--- import

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "zooIsland";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  @Override
  public boolean onKeyDown(int keyCode, KeyEvent event) {
    // React Native에 이벤트 전달
    KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);

    // // 볼륨 버튼에 대한 이벤트인 경우, 기본 동작 방지
    // if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN || keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
    //     return true; // 여기서 true를 반환하여 기본 동작을 방지
    // }

    // 그 외 키에 대해서는 기본 동작을 수행
    return super.onKeyDown(keyCode, event);
  }
    @Override  // <--- Add this method if you want to react to keyUp
    public boolean onKeyUp(int keyCode, KeyEvent event) {
      KeyEventModule.getInstance().onKeyUpEvent(keyCode, event);

      // There are 2 ways this can be done:
      //  1.  Override the default keyboard event behavior
      //    super.onKeyUp(keyCode, event);
      //    return true;

      //  2.  Keep default keyboard event behavior
      //    return super.onKeyUp(keyCode, event);

      // Using method #1
      // super.onKeyUp(keyCode, event);
      // return true;
      return super.onKeyUp(keyCode, event);
    }

    @Override
    public boolean onKeyMultiple(int keyCode, int repeatCount, KeyEvent event) {
        KeyEventModule.getInstance().onKeyMultipleEvent(keyCode, repeatCount, event);
        return super.onKeyMultiple(keyCode, repeatCount, event);
    }
}
