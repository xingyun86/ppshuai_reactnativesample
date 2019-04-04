
CD /D %~dp0
SET ROOT=%CD%

SET ANDROID_HOME=D:\DevelopmentEnvironment\Softwares\Android\AndroidIDEA\android-sdk-windows
@REM SET PATH=%ANDROID_HOME%\tools;%PATH%
SET PATH=%ANDROID_HOME%\platform-tools;%PATH%
SET PATH=D:\DevelopmentEnvironment\Softwares\Android\AndroidSDK\platform-tools;%PATH%
DEL /S /Q %ROOT%\android\app\build
RMDIR /S /Q %ROOT%\android\app\build
RMDIR /S /Q %ROOT%\android\app\src\main\assets

START "http://localhost:8081/" /D %ROOT% npm run start

MKDIR %ROOT%\android\app\src\main\assets

CHOICE /t 36 /d y /n >NUL

curl --insecure "http://localhost:8081/index.android.bundle" > %ROOT%\android\app\src\main\assets\index.android.bundle


@REM START "gradlew assembleRelease" gradlew assembleRelease
@REM %ROOT%\android\gradlew assembleRelease --project-dir %ROOT%\android 
@REM adb install -r %ROOT%\android\app\build\outputs\apk\release\app-release.apk

.\android\gradlew assembleRelease --project-dir .\android

@REM adb uninstall com.rntest && .\android\gradlew assembleRelease --project-dir .\android && adb install -r android\app\build\outputs\apk\release\app-release.apk && adb shell am start -n com.rntest/.MainActivity
