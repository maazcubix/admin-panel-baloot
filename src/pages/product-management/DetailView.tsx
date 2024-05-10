import { FileUpload } from "primereact/fileupload";
import AuthLayout from "../AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { uploadImage } from "../../../api/imageUpload";
import { createStore } from "../../../api/createStore";
import Loader from "../../assets/loader";
import { Toast } from "primereact/toast";
const item = [
    { name: "Vip Table", code: "VipTable" },
    { name: "Tokens", code: "Tokens" },
    { name: "Emojis", code: "Emojis" },
    { name: "Cards", code: "Cards" },
    { name: "Premium Pass", code: "PremiumPass" },
  ];

  const card = [
    { name: "Special Decks", code: "SpecialDecks" },
    { name: "Card Backs", code: "CardBacks" },
  ];

const DetailView = () => {
    const toast = useRef(null);
    const navigate=useNavigate();

  const [loading, setLoading] = useState(false);
  const [itemType, selectItemType] = useState("");
  const [cardType, setCardType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  
  
  const [GoogleID, setGoogleID] = useState({
    id: "",
    priceAED: Number(""),
  });
  const [AppleID, setAppleID] = useState({
    id: "",
    priceAED: Number(""),
  });
  

  const [price, setPrice] = useState<number | null>(0);
  const [shortCode, setShortCode] = useState("");


 
  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Item Created successfully', life: 3000});
}
const showError = (message) => {
    toast.current.show({severity:'error', summary: 'Error', detail:`${message}`, life: 3000});
}

  function CustomUploadDemo() {
    const customBase64Uploader = async (event: any) => {
      // convert file to base64 encoded
      const file = event.files[0];
      setFile(file);
      const reader = new FileReader();
      let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

      reader.readAsDataURL(blob);
      

      reader.onloadend = function () {
        const base64data = reader.result;
        
      };

      setImage(URL.createObjectURL(blob));
    };

    return (
      <div className="card flex justify-content-center">
        <FileUpload
        className="mt-10"
        chooseLabel='upload the product image'
          mode="basic"
          name="demo[]"
          url="/api/upload"
          accept="image/*"
          auto
          
          customUpload
          
          uploadHandler={customBase64Uploader}
        />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true)

    try {
        
      if (file) {

        const form = new FormData();
        form.append("file", file);
        const response = await uploadImage(form);
        const image_url: string = response.data.data.file_url;

        const payload = {
          image: image_url,
          itemType: itemType?.code,
          name,
          shortCode,
          ...(itemType?.code === "Tokens"
            ? { tokensReward: Number(price) }
            : { priceInTokens: Number(price) }),
          cardType: cardType?.code,
          appleId:(itemType.code === "PremiumPass" || itemType.code === "Tokens") ? AppleID : null,
          googleId: (itemType.code === "PremiumPass" || itemType.code === "Tokens") ? GoogleID : null
        };
        const storeResponse = await createStore(payload);
        setLoading(false);
        showSuccess();
        // navigate("/product-management")
      }
      else {
        setLoading(false)
        showError("need image")
        
      }
    } catch (error) {
      console.log(error);
      
      if(error.response.data.msg){
      showError(error.response.data.msg)
      setLoading(false)
}
else{
  showError(error.response.errors[0]);
  setLoading(false)

}
    }
  };

  return (
    <AuthLayout>
        {
            loading &&
      <div className="h-1/2  w-2/3  absolute z-2 flex justify-center items-center">
        <Loader />
      </div>
}

      <div className="d-flex opacity justify-content-between align-items-center flex-wrap grid-margin">
      <Toast ref={toast} />

        <div>
          <h4 className="mb-3 mb-md-0">Product </h4>
        </div>
        <div>
          <Link to="/product-management" className="btn btn-success">
            Back
          </Link>
        </div>
      </div>
      <form   onSubmit={handleSubmit}>
      <div className="datatable-doc-demo   ">
 
        <div className="card">
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  {image ? (
                    <img
                      className="rounded-circle mt-5"
                      width="150px"
                      src={image}
                    />
                  ) : (
                    <>
                           <CustomUploadDemo />
                           </>
                  )}
                </div>
              </div>
              <div className="col-md-9 border-right">
                <div className="p-3 py-5">
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <p>Select Type</p>
                      <Dropdown
                        value={itemType}
                        onChange={(e) => selectItemType(e.value)}
                        options={item}
                        optionLabel="name"
                        placeholder="Select a Item "
                        className="w-full md:w-14rem"
                        checkmark={true}
                        highlightOnSelect={false}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">
                        <strong> Name</strong>
                      </label>
                      <input
                        
                        type="text"
                        required
                        className="form-control caption_input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name of the Item"
                      />
                    </div>
                  </div>
                  {}{" "}
                  <div className="row mt-3">
                    {!(itemType?.code === "PremiumPass") && (
                      <div className="col-md-6">
                        <label className="labels">
                          <strong>
                            {itemType?.code === "Tokens"
                              ? "Tokens Reward"
                              : "Price"}{" "}
                          </strong>
                        </label>
                        <input
                          required
                          type="number"
                          className="form-control caption_input"
                          placeholder="enter address line 1"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    )}
                    <div className="col-md-6">
                      <label className="labels">
                        <strong>ShortCode </strong>
                      </label>
                      <input
                      required
                        type="text"
                        className="form-control caption_input"
                        placeholder="Joining Date"
                        value={shortCode}
                        onChange={(e) => setShortCode(e.target.value)}
                      />
                    </div>
                  </div>
                  {itemType?.code &&
                    ["Tokens", "PremiumPass"].includes(itemType.code) && (
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="labels">
                            <strong>Apple Id </strong>
                          </label>
                          <input
                          required
                            type="text"
                            className="form-control caption_input"
                            placeholder="enter address line 1"
                            value={AppleID.id}
                            onChange={(e) =>
                              setAppleID({
                                ...AppleID,
                                id: e.target.value,
                              })
                            }
                          />

                          <label className="labels mt-2">
                            <strong>Price in Aed Apple </strong>
                          </label>
                          <input
                          required
                            type="number"
                            className="form-control caption_input"
                            placeholder="enter address line 1"
                            value={AppleID.priceAED}
                            onChange={(e) =>
                              setAppleID({
                                ...AppleID,
                                priceAED: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="labels">
                            <strong>GoogleID </strong>
                          </label>

                          <input
                            required
                            type="number"
                            className="form-control caption_input"
                            placeholder="Joining Date"
                            value={GoogleID.id}
                            onChange={(e) =>
                              setGoogleID({
                                ...GoogleID,
                                id: e.target.value,
                              })
                            }
                          />

                          <label className="labels mt-2">
                            <strong>Price in Aed For Google </strong>
                          </label>
                          <input
                          required
                            type="text"
                            className="form-control caption_input"
                            placeholder="Joining Date"
                            value={GoogleID.priceAED}
                            onChange={(e) =>
                              setGoogleID({
                                ...GoogleID,
                                priceAED:Number( e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  {itemType?.code === "Cards" && (
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <Dropdown
                          value={cardType}
                          onChange={(e) => setCardType(e.value)}
                          options={card}
                          optionLabel="name"
                          placeholder="Select a Card Type"
                          className="w-full md:w-14rem"
                          defaultValue={card[0].name}
                          checkmark={true}
                          highlightOnSelect={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              disabled={!file && !itemType}
              className=" block mx-auto btn-success p-3 rounded-md"
              type="submit"
            
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      </form>
    </AuthLayout>
  );
};

export default DetailView;
