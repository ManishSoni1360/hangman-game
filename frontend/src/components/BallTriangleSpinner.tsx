import { useTranslations } from "next-intl";
import React from "react";
import { BallTriangle } from "react-loader-spinner";

const BallTriangleSpinner = () => {
  const t = useTranslations("Game");
  return (
    <div className="fixed inset-0 flex flex-col gap3 justify-center items-center bg-black bg-opacity-60">
      <h1 className="text-slate-100 font-semibold text-2xl animate-pulse">
        {t("loading")}...
      </h1>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default BallTriangleSpinner;
