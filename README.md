
# ![Work Clocker logo](src/assets/workclocker-logo64.png) Work Clocker


***A KISS Time Card program***

[**Work Clocker**](https://github.com/Ribeiro-Tiago/work-clocker) is a "timecard punch" app to allow workers to better manage their time to 
avoid working more than the 8 hours they need to. Among other things, tells you when you can leave, taking into account the starting time, 
lunch duration and duration of a regular work day.

[![SourceForge](https://img.shields.io/github/downloads/Ribeiro-Tiago/work-clocker/total.svg?style=social)](https://github.com/Ribeiro-Tiago/work-clocker)

[![Screenshot](src/assets/screenshots/1.png)](https://github.com/Ribeiro-Tiago/work-clocker/src/assets/screenshots/)

Planned features are listed in the *TODO* file. Details on already implemented features are available in the *CHANGELOG* file. 
If you have an idea that has not yet been proposed or rejected, feel free to [open a new issue](https://github.com/Ribeiro-Tiago/work-clocker/issues/new).

## Install

You can either compile Work Clocker from source or use pre-compiled binaries.

### From source

To build Work Clocker, you will need the following dependencies: **Qt 5.6.0** (or newer), **OpenSSL 1.0** (or newer), **GStreamer 1.0** (or newer) and codecs, and **CMake 3.1.0** (or newer). At the root of the directory where the source code is stored, execute these commands:

    mkdir build
    cd build
    cmake ../
    make
    make install

Detailed instructions are available in the *INSTALL.md* file in the root of the repository.

### Under iOS

Linux users can use the official AppImage version available on [SourceForge](https://sourceforge.net/projects/otter-browser/files/). It is a single executable file that doesn’t need any dependencies to be installed. The AppImage version should run under any system installed after 2012 provided it has OpenSSL 1.0.x (not 1.1.x) and GStreamer 1.x (with codecs). The browser is also available in the repositories of a wide range of Linux distributions and *BSD systems. Read more on [the dedicated wiki page](https://github.com/OtterBrowser/otter-browser/wiki/Packages).

### Under Android

Windows users can download binary releases on [SourceForge](https://sourceforge.net/projects/otter-browser/files/).

## How to contribute

Work Clocker is *your* timecard tracker. Because it is free software (GPL v3), you can contribute to make it better. 
New contributors are always welcome, whether you write code, create resources, report bugs, or suggest features.

The app is written primarily in C++ and leverages powerful features offered by the Qt5 framework.

We also use JavaScript for interacting with rendering engines (when native APIs are not available) and Python 3 is our preferred language for creating tools to ease development.
