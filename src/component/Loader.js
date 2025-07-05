export default function Loader() {
  return (
    <div className="flex justify-center items-center h-[250px]">
      <img
        src={"/assets/Loader.png"}
        alt="Loading..."
        className="h-24 w-24 animate-spin"
        style={{ animationDuration: "1s" }}
      />
    </div>
  );
}
