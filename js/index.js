import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const apiRoot = "https://vue3-course-api.hexschool.io/v2/";
const aipPath = "jamievue";

let productModal = {};
let delProductModal = {};

const app = createApp({
  data() {
    return {
      
      isNew: false,
      temp: {
        imagesUrl: [],
      },
      // 產品資料格式
      products: [],
    };
  },
  methods: {
    /**
     * 確認登入狀態
     */
    checkLogin() {
      const url = `${apiRoot}api/user/check`;

      axios
        .post(url)
        .then((res) => {
          // 取得商品列表並顯示
          this.getPorducts();
        })
        .catch((err) => {
          window.location = "./login.html";
        });
    },
    /**
     * 取得商品列表並顯示
     */
    getPorducts() {
      const url = `${apiRoot}api/${aipPath}/admin/products/all`;

      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;

          console.log(bootstrap);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * e/ 更新商品列表並顯示
     */
    updateProduct(tempProduct) {
      // 新增
      let url = `${apiRoot}api/${aipPath}/admin/product/`;
      let method = "post";

      if (!this.isNew) {
        // 編輯
        url = `${apiRoot}api/${aipPath}/admin/product/${this.temp.id}`;
        method = "put";
      }

      axios[method](url, { data: this.temp })
        .then(() => {
          // 取得商品列表並顯示
          this.getPorducts();

          // 關閉 modal
          productModal.hide();
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    deleteProduct() {
      const url = `${apiRoot}api/${aipPath}/admin/product/${this.temp.id}`;

      axios
        .delete(url)
        .then(() => {
          // 取得商品列表並顯示
          this.getPorducts();
          delProductModal.hide();
        })
        .catch((err) => {});
    },
    /**
     * 修改商品資料互動視窗
     * @param { string } status create、edit、delete
     * @param { object } product 商品資料
     */
    openModal(status, product) {
      productModal.show();

      if (status === "create") {
        this.isNew = true;

        // 初始化
        this.temp = {
          imagesUrl: [],
        };
      } else if (status === "edit") {
        this.isNew = false;

        // 要編輯的資料
        this.temp = { ...product };
      } else if (status === "delete") {
        delProductModal.show();

        // 要編輯的資料
        this.temp = { ...product };
      }
    },
    closeModal() {
      productModal.hide();
    },
  },
  mounted() {
    //取登入token
    const token = document.cookie
      .replace((/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
      .replace("hexschool=", "");
    //axios預設帶token
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();

    // boostrap 方法初始化
    productModal = new bootstrap.Modal("#productModal");
    delProductModal = new bootstrap.Modal("#delProductModal");
  },
});

app.mount("#app");
