import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products.js";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import NewProduct from "./pages/NewProduct.js";
import MonitorRoute from "./routes/MonitorRoute.js";
import EditProduct from "./pages/EditProduct.js";
// import EditProduct from "./pages/EditProduct.js";
import Chat from "./pages/Chat.js";
import OrderDetail from "./pages/OrderDetail.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Navbar />
                <div className="content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    {/* <Route path="/chat" element={<Chat />} /> */}
                    <Route path="/create-product" element={<NewProduct />} />
                    <Route path="/edit-product/:id" element={<EditProduct />} />
                    {/* <Route path="/edit-product/:productId" element={<EditProduct />} /> */}
                    <Route path="/orders/:orderId" element={<OrderDetail />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Route>
        <Route element={<MonitorRoute />}>
          <Route
            path="/chat/*"
            element={
              <>
                <Header />
                <Navbar />
                <div className="content">
                  <Routes>
                    <Route index={true} element={<Chat />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
