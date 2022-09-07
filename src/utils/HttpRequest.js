import axios from "axios";

const post = async (url, data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (["imageFile", "imageShortFile"].includes(key)) {
      formData.append(key, data[key], data[key].name);
    } else {
      formData.append(key, data[key]);
    }
  });
  const res = await axios({
    method: "post",
    url: url,
    data: formData,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

const request = async (url, data, onSuccess, onError) => {
  post(url, data)
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      onError(err);
    });
};

const automaticRequest = async (
  url,
  data,
  success,
  showAlert,
  error = null
) => {
  const onError = (err) => {
    showAlert("خطا", "خطا در ارتباط با سرور");
    if (error !== null) {
      error(err);
    }
  };
  const onSuccess = (response) => {
    if (!response.state) {
      showAlert("خطا", response.msg);
      if (error != null) {
        error();
      }
      return;
    }
    success(response);
  };

  post(url, data)
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      onError(err);
    });
};

export { post, request, automaticRequest };
