import { FC } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface PaginationProps {
  goTo: any;
  pagination: any;
}

const Pagination: FC<PaginationProps> = ({ goTo, pagination }) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div>
        {pagination.current_page != 1 ? (
          <button
            onClick={() => goTo(pagination.current_page - 1)}
            className="p-3 rounded-full text-sm bg-primary text-white"
          >
            <AiOutlineLeft />
          </button>
        ) : null}
      </div>
      <div>
        {pagination.current_page != pagination.last_page ? (
          <button
            onClick={() => goTo(pagination.current_page + 1)}
            className="p-3 rounded-full text-sm bg-primary text-white"
          >
            <AiOutlineRight />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
