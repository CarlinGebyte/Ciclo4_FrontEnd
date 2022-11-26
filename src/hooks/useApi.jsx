import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";

const useApi = ({ url, method, body = {}, errMessage = "" }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const source = axios.CancelToken.source();
				const response = await axios({
					url,
					method,
					data: body,
					cancelToken: source.token,
				});
				setData(response.data);
			} catch (e) {
				swal.fire({
					icon: "error",
					title: errMessage,
					text: "Ocurrió un error, por favor contacte al administrador",
				});
			}
			return () => {
				source.cancel();
			}
		};
		fetchData();
	}, [url, method, body, errMessage]);

	return [data];
};

export default useApi;
