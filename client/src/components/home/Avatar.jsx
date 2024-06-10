import { useEffect, useState } from "react";
import axios from "axios";

function Avatar() {
    const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState(null);

    // useEffect(() => {
    //     getImage();
    // }, []);
    const submitImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/upload-image`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }
        ).then(res => console.log(res))
            .catch(err => console.log(err.message))

    };

    const onInputChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    // const getImage = async () => {
    //     const result = await axios.get("http://localhost:5000/get-image");
    //     console.log(result);
    //     setAllImage(result.data.data);
    // };

    return (
        <div>
            <form onSubmit={submitImage}>
                <input type="file" accept="image/*" onChange={onInputChange}></input>
                <button type="submit">Submit</button>
            </form>
            {allImage == null
                ? ""
                : allImage.map((data) => {
                    return (
                        <img
                            src={require(`./images/${data.image}`)}
                            height={100}
                            width={100}
                        />
                    );
                })}
        </div>
    );
}
export default Avatar;