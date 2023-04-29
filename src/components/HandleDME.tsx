interface HandleDMEProps {}

const HandleDME = ({}: HandleDMEProps) => {
  const handleDME = () => {
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((permissionState: any) => {
          if (permissionState === "granted") {
            console.log(permissionState);
          }
        })
        .catch(console.error);
    }
  };

  return (
    <button
      onClick={handleDME}
      className="p-3 bg-cyan-600 text-white w-full mt-5"
    >
      Handle DME
    </button>
  );
};

export default HandleDME;
