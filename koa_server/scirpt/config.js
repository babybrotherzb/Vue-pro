const config = {
    app_name: "vue2-vuex",
    project_name: "vue2-vuex",
    is_socket: false,
    // http://www.browsersync.cn/docs/options/
    hotServer: {
        port: 8889,
        open: false, 
        exclude: "node_modules",
        proxy: "http://localhost:8887"
    },
    server: {
        port: 8886
    },
    env: [
        {
            name: "release",
            title: "测试环境"
        },
        {
            name: "production",
            title: "正式环境"
        }
    ]
};

module.exports = config;
