import './style.css'

const MyComponent = () => {
  // const hoidanit = "tung";
  // const num = 25;
  const tung = {
    name: "tung",
    age: "21"
  }
  return (
    // Fragment
    <>
    <div className=""> {JSON.stringify(tung.age)} Tung hoc react library</div>
    {/*
      dấu nháy đôi đầu tiên tượng trưng cho style viết trong html,
      dấu nháy đôi hai tượng trưng cho object
     */}
     <div>{console.log("Tung learn React")}</div>
    <div className="child" style = {{borderRadius: "10px"}}>Fragment</div>
    </>
  );
};

export default MyComponent;