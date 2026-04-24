import React, { useState, useEffect } from "react";
import { Contract } from "../../../types/contract";
import { Car } from "@/app/evm/admin/cars/types";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";
import { searchFilterCustomer } from "@/services/customerService/customer";
import ContractTableHeader from "./components/ContractTableHeader";
import ContractTableRow from "./components/ContractTableRow";
import ContractEmptyState from "./components/ContractEmptyState";
import ContractCancelModal from "./components/ContractCancelModal";

interface ContractTableProps {
  contracts: Contract[];
  onViewDetail: (id: string) => void;
  onEdit?: (contract: Contract) => void;
  onDelete?: (contract: Contract) => void;
  onDownload?: (id: string) => void;
  onCancel: (id: string, reason: string) => void;
  vehicles: Car[];
}

const ContractTable: React.FC<ContractTableProps> = ({
  contracts,
  onViewDetail,
  onEdit,
  onDelete,
  onDownload,
  onCancel,
  vehicles
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [customers, setCustomers] = useState<CustomerVIP[]>([]);
  const [cancelModal, setCancelModal] = useState<{
    open: boolean;
    id: string | null;
  }>({ open: false, id: null });
  const [reason, setReason] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // số hợp đồng trên 1 trang

  const totalPages = Math.ceil(contracts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContracts = contracts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchFilterCustomer({});
        if (Array.isArray(response)) {
          setCustomers(response);
        } else {
          setCustomers([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const handleOpenCancelModal = (id: string) => {
    setCancelModal({ open: true, id });
  };

  const handleCloseCancelModal = () => {
    setCancelModal({ open: false, id: null });
    setReason("");
  };

  const handleConfirmCancel = () => {
    if (cancelModal.id && reason.trim() !== "") {
      onCancel(cancelModal.id, reason);
      handleCloseCancelModal();
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-2xl overflow-hidden border border-gray-100">
        <div>
          <table className="w-full">
            <ContractTableHeader />
            <tbody className="divide-y divide-gray-200">
              {currentContracts.map((contract) => (
                <ContractTableRow
                  key={contract.id}
                  contract={contract}
                  isExpanded={expandedIds.includes(contract.id)}
                  customers={customers}
                  vehicles={vehicles}
                  onViewDetail={onViewDetail}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDownload={onDownload}
                  onToggleExpand={toggleExpand}
                  onOpenCancelModal={handleOpenCancelModal}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {contracts.length === 0 && <ContractEmptyState />}

        {/* Pagination */}
        {contracts.length > itemsPerPage && (
          <div className="flex justify-end items-center gap-2 p-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      <ContractCancelModal
        isOpen={cancelModal.open}
        reason={reason}
        onReasonChange={setReason}
        onConfirm={handleConfirmCancel}
        onClose={handleCloseCancelModal}
      />
    </>
  );
};

export default ContractTable;
