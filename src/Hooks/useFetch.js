import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); /// პასუხის მიღების ლოდინი
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    //// abort controller
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        //// fetch-ის მოთხოვნასთან აგზავნის სიგნალს
        const res = await fetch(url, { signal });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        //// თუ ერორი გამოწვეულია abort-ის მიერ უბრალოდ კონსოლში გვაჩვენებს
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          //! სხვა ერორის შემთხვევაში, ერორის state-ს შეცვლის
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    //// თუ მომხმარებელი სხვა pageზე გადავა ან url შეიცვლება
    //// სანამ fetch მუშაობას დაასრულებს, გამოიძახება cleanup ფუნქცია
    return () => {
      controller.abort();
    };
  }, [url]); /// ეშვება თავიდან url-ს შეცვლაზე

  return { data, loading, error };
};

export default useFetch;
