import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { BaseUrl } from "../../backend/Api"; // تأكد من استيراد BaseUrl
import { getData } from "../../backend/ApiServecies";
import APPLoading from "../LOADING/APPLoading.jsx";
import { clearUserInfo, setUserInfo } from "../../backend/slice/auth/userInfo";

const cookies = new Cookies();

export default function ProtectedRoute({ allowedRole }) {
  const dispatch = useDispatch();

  // جلب معلومات المستخدم من الـ Redux Store
  const userInfo = useSelector((state) => state.user?.userInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = cookies.get("token");
        const loginType = cookies.get("loginType"); // 🌟 قراءة نوع الحساب من الكوكيز

        // إذا لم يكن هناك توكن أو نوع حساب مخزن، قم بتسجيل الخروج فوراً
        if (!token || !loginType) {
          dispatch(clearUserInfo());
          setLoading(false);
          return;
        }

        // إذا كانت بيانات المستخدم موجودة مسبقاً في الـ Redux، فلا داعي لطلب الـ API مجدداً
        if (userInfo) {
          setLoading(false);
          return;
        }

        // 🌟 تحديد مسار الـ API الصحيح بناءً على الكوكيز
        const endpoint = loginType === "admin" ? "/api/admin/me" : "/api/staff/me";
        const url = `${BaseUrl}${endpoint}`;

        const response = await getData(url);
        
        // بناءً على الـ JSON المرفق: البيانات موجودة داخل response.data
        // كائن السيرفر يرجع بالشكل: { success: true, data: { id: 35, email: ... } }
        if (response?.data) {
          dispatch(setUserInfo(response.data)); 
        }
        
      } catch (error) {
        console.log("SESSION ERROR =", error);
        dispatch(clearUserInfo());
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch, userInfo]); // أضفنا userInfo للمصفوفة لضمان استقرار الفحص

  // أثناء فحص الجلسة وجلب البيانات من السيرفر
  if (loading) {
    return <APPLoading />;
  }

  console.log("FINAL USER =", userInfo);

  // إذا لم يتم العثور على بيانات المستخدم (غير مسجل دخول أو انتهت صلاحية التوكن)
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // إذا كان الرول الحالي للمستخدم غير مسموح له بدخول هذا المسار
  if (!allowedRole.includes(userInfo.role)) {
    return <Navigate to="/login" replace />;
  }

  // إذا كان كل شيء سليماً، اسمح بالدخول وعرض المكونات الداخلية
  return <Outlet />;
}