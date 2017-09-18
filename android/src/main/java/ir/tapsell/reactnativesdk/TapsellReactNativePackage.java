package ir.tapsell.reactnativesdk;
/* Created by ahmadrezasy on 9/11/17. */

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import ir.tapsell.sdk.NoProguard;
import ir.tapsell.sdk.TapsellReactNativeModule;

public class TapsellReactNativePackage implements ReactPackage, NoProguard {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new TapsellReactNativeModule(reactContext));
        return modules;
    }

}
