import { FC } from "react";
import { SearchParams } from "@/types";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import classNames from "classnames";
import { useLoading } from "@/store/interact";

interface FullPaginationProps {
  searchParams?: SearchParams;
  model: any;
  name: string;
}

const FullPagination: FC<FullPaginationProps> = ({
  searchParams,
  model,
  name,
}) => {
  const loading = useLoading();

  const previous = () => {
    window.scroll({ top: 0, behavior: "smooth" });
    loading.start(name);
    model
      .search({
        ...searchParams,
        page: model.pagination.current_page - 1,
      })
      .finally(() => {
        loading.stop(name);
      });
  };

  const next = () => {
    window.scroll({ top: 0, behavior: "smooth" });
    model
      .search({
        ...searchParams,
        page: model.pagination.current_page + 1,
      })
      .finally(() => {
        loading.stop(name);
      });
  };

  const goTo = (pageNumber: number) => {
    window.scroll({ top: 0, behavior: "smooth" });
    model
      .search({
        ...searchParams,
        page: pageNumber,
      })
      .finally(() => {
        loading.stop(name);
      });
  };

  return (
    <nav className="flex items-center space-x-4">
      <span>
        Affichage de <strong> {model.pagination.from}</strong> à
        <strong> {model.pagination.to} </strong> sur
        <strong> {model.pagination.total} </strong>
      </span>
      <ul className="flex items-center -space-x-px h-10 text-base">
        {model.pagination.current_page != 1 ? (
          <li>
            <button
              onClick={previous}
              className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <MdNavigateBefore />
            </button>
          </li>
        ) : null}

        {Array.from({
          length: model.pagination.last_page,
        })
          .map((_, index) => index + 1)
          .map((pageNumber) => (
            <li key={`pageNumber${pageNumber}`}>
              <button
                onClick={() => goTo(pageNumber)}
                className={classNames(
                  "flex items-center justify-center px-4 h-10 leading-tight ",
                  {
                    "bg-secondary text-white border border-secondary":
                      model.pagination.current_page == pageNumber,
                    "text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700":
                      model.pagination.current_page != pageNumber,
                  }
                )}
              >
                {pageNumber}
              </button>
            </li>
          ))}

        {model.pagination.current_page != model.pagination.last_page ? (
          <li>
            <button
              onClick={next}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <MdNavigateNext />
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default FullPagination;
