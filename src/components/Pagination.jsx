import { useState } from "react"
import '../assets/styles/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const safeTotalPages = totalPages > 500 ? 500 : totalPages;
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    // Logic để lấy danh sách 6 số trang
    const getPageNumbers = () => {
        let start = Math.max(1, currentPage - 2); // Lùi 2 trang
        let end = Math.min(safeTotalPages, start + 5); // Lấy tổng cộng 6 trang
        
        // Điều chỉnh lại nếu ở những trang cuối (để luôn đủ 6 trang nếu có thể)
        if (end - start < 5) {
            start = Math.max(1, end - 5);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = getPageNumbers();
    
    return (
        <div className="pagination">
            <button disabled={currentPage == 1} onClick={()=> {onPageChange(1)}}>{"<<"}</button>
            <button disabled={currentPage == 1} onClick={handlePrevious}>{"<"}</button>
            {pages.map((page) => (
                <span
                    key={page}
                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </span>
            ))}
            <button disabled={currentPage == safeTotalPages} onClick={handleNext}>{">"}</button>
            <button disabled={currentPage == safeTotalPages} onClick={()=> {onPageChange(safeTotalPages)}}>{">>"}</button>
        </div>
    )
}
export default Pagination