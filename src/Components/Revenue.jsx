import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Revenue() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchRevenue = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/revenue`, {
        credentials :"include",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setData(result.data);
        setTotal(result.total);
      } else {
        toast.error(result.message);
      }

    } catch (err) {
      console.log(err);
      toast.error("Error fetching revenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-white p-4">
      
      <h1 className="text-2xl font-bold mb-4">Revenue</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent animate-spin rounded-full"></div>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="bg-[#111827] rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#1F2937]">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>

              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">
                        {new Date(item.entrydate).toLocaleDateString()}
                      </td>
                      <td className="p-3">₹ {item.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="mt-4 text-right text-xl font-bold">
            Total: ₹ {total}
          </div>
        </>
      )}
    </div>
  );
}