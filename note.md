# note
首次尝试写react组件，在搭建过程遇见一些坑，不理解的概念，就此记录📝一下。

##peerDependencies

>In some cases, you want to express the compatibility of your package with a host tool or library, while not necessarily doing a require of this host. This is usually referred to as a plugin. Notably, your module may be exposing a specific interface, expected and specified by the host documentation.

大概的意思就是：通常是在插件开发的场景下，你的插件需要某些依赖的支持，但是你又没必要去安装，因为插件的宿主会去安装这些依赖，你就可以用peerDependencies去声明一下需要依赖的插件和版本，如果出问题npm就会有警告来提醒使用者去解决版本冲突问题。

## what's the difference between setupFiles and setupTestFrameworkScriptFile of jest ？

参考：https://stackoverflow.com/questions/47587689/whats-the-difference-between-setupfiles-and-setuptestframeworkscriptfile?rq=1

> `setupTestFrameworkScriptFile` and `setupFiles` are executed before each file containing tests. If you have 10 tests in one file - no mater how many describe's - it will run once. If in 2 separate files - it will run twice.

> In both `setupTestFrameworkScriptFile` and `setupFiles` you can initiate globals, like this: global.MY_GLOBAL = 42

setupFiles run before test framework is installed in the environment.

> In `setupTestFrameworkScriptFile` you have also access to installed test environment, methods like describe, expect and other globals. You can for example add your custom matchers there:


