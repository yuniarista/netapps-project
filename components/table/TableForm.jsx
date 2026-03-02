import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import InputText from "@/components/inputcopy/inputText";

export default function TableForm({
  control,
  errors,
  showButton = true,
  showDelete = true,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invoiceItems",
  });

  const column = ["name", "price", "disc", "total"];

  return (
    <div>
      <div className="w-full overflow-x-auto py-0 rounded-[5px] border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-500">
                Package Item Name
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-500">
                Price
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-500">
                Disc
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-500">
                Total
              </th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr
                key={field.id}
                className="border-b border-muted last:border-none"
              >
                {column.map((col) => (
                  <td key={col} className="py-2 px-1">
                    <InputText
                      name={`invoiceItems.${index}.${col}`}
                      placeholder={`Enter ${col}`}
                      control={control}
                      showLabel={false}
                    />
                  </td>
                ))}
                {showDelete && (
                  <td className="py-2 px-1 text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showButton && (
        <button
          type="button"
          onClick={() => append({ name: "", price: 0, disc: 0, total: 0 })}
          className="flex items-center gap-2 mt-4 text-blue-600 font-medium text-sm hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      )}
    </div>
  );
}
