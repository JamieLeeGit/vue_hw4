import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const apiRoot = 'https://vue3-course-api.hexschool.io/v2/';

const app = createApp({
    data() {
        return {
            // 登入帳密
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        /**
         * 登入
         */
        login(){
            const url = `${apiRoot}admin/signin`;
            const instance = axios.create();

            instance.defaults.timeout = 3000;

            instance.post(url, this.user)
                .then((res)=>{
                    // 取得 token、到期時間
                    const { token, expired } = res.data;

                    // 把 token 存到 cookie
                    document.cookie = `hexschool=${token}; exxpires=${new Date(expired)}`;

                    // 自動帶入 axios headers
                    axios.defaults.headers.common['Authorization']=token;

                    // 轉導商品列表頁
                    window.location = './index.html'
                })
                .catch(err=>{
                    console.log(err)
                });
        }
    },
    mounted() {
        
    },
});

app.mount('#app');