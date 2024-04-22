import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

import SignInForm from "./_auth/forms/SignInForm";
import Tasks from "./_root/pages/Tasks";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from ".";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        {!store.isAuth ? (
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
          </Route>
        ) : (
          <Route path="/sign-in" element={<Navigate to="/tasks" replace />} />
        )}

        {/* Private Routes */}
        {store.isAuth ? (
          <Route element={<RootLayout />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        ) : (
          <Route path="/tasks" element={<Navigate to="/sign-in" replace />} />
        )}

        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </main>
  );
}

export default observer(App);
