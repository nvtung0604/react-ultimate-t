import { Drawer } from "antd";
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
    return (
        <>
            <Drawer
                width={"40vw"}
                title="Chit tiết User"
                closable={{ "aria-label": "Close Button" }}
                onClose={() => {
                    setDataDetail(null);
                    setIsDetailOpen(false);
                }}
                open={isDetailOpen}
            >
                {dataDetail ? (
                    <>
                        <p>Id: {dataDetail._id}</p>
                        <br />
                        <p>Full name: {dataDetail.fullName}</p>
                        <br />
                        <p>Phone number: {dataDetail.phone}</p>
                        <br />
                        <div>
                            <p>Avatar: </p>
                            <img
                                width={"100px"}
                                height={"150px"}
                                src={`http://localhost:8080/images/avatar/${dataDetail.avatar}`}
                                alt=""
                            />
                        </div>
                        <div style={{ marginTop: "7px" }}>
                            <label
                                style={{
                                    cursor: "pointer",
                                    background: "green",
                                    padding: "7px",
                                    borderRadius: "4px",
                                    color: "#fff",
                                }}
                                htmlFor="btnInputFile"
                            >
                                Upload Avatar
                            </label>
                            <input
                                type="file"
                                name=""
                                id="btnInputFile"
                                hidden
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                )}
            </Drawer>
        </>
    );
};
export default ViewUserDetail;
