import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";
import { useState } from "react";

export default function ExpenseList() {
  const { entries, setEntries } = useEntries();
  // const [filterData,setfilteredData]= useState([])
  const handleDelete = id =>{
    console.log("deleteid:",id);
    const remaining = entries.filter(cart=>cart.id!==id);
    setEntries(remaining);
  }

  const handleUpdate = (id) => {
    const newValue = prompt("Enter the new value:");

    if (newValue !== null) {
      const updatedEntries = entries.map((entry) =>
        entry.id === id ? { ...entry, value: parseFloat(newValue) } : entry
      );

      setEntries(updatedEntries);
    }
  };
  console.log('entry',entries);
  const expenseEntries = entries.filter((entry) => entry.type === "expense");
  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-red-600">Expense</h2>

      {expenseEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="expense-list" className="divide-y">
        {expenseEntries.map((item) => {
          return (
            <li key={item.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{item.title}</span>
                <div>
                  <span className="text-red-600">
                    -{formatMoney(item.value)}
                  </span>
                  <span className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
                  <button className="btn bg-red-600 rounded-md text-white p-1 mr-2" onClick={()=>handleDelete(item.id)}> Delete</button>
                  <button className="btn bg-blue-600 rounded-md text-white p-1"onClick={()=>handleUpdate(item.id)}> Update</button>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
