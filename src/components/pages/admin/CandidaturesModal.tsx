import ResourceListing from "@/components/common/ResourceListing";
import SideModal from "@/components/common/SideModal";
import { PAGES } from "@/config";
import { Candidature, useCandidature } from "@/store/candidature";
import Link from "next/link";
import { FC } from "react";

const CandidaturesModal: FC = () => {
  const candidature = useCandidature();
  return (
    <SideModal
      title={"Les candidatures"}
      show={candidature.items.length > 0}
      setShow={(show) => {
        if (!show) {
          candidature.filter((i) => false);
        }
      }}
    >
      <ResourceListing
        model={candidature}
        loadResource={false}
        name={"candidatures"}
      >
        <table className="w-full text-left">
          <thead className="bg-primary text-sm text-white uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Noms et prenoms
              </th>

              <th scope="col" className="px-6 py-3">
                Date postulation
              </th>
            </tr>
          </thead>
          <tbody>
            {candidature.items.map((item: Candidature, index) => (
              <tr className="bg-white border-b" key={`candidature${item.id}`}>
                <th
                  scope="row"
                  className="px-6 border py-4 font-medium whitespace-nowrap  hover:underline cursor-pointer"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4 border">
                  <div>
                    {item.intervenant.prenom} {item.intervenant.nom}
                  </div>
                  <div className="text-blue-600 hover:underline">
                    <Link href={PAGES.ADMIN.intervenants(item.intervenant.id)}>
                      {item.intervenant.email}
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 border">{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ResourceListing>
    </SideModal>
  );
};

export default CandidaturesModal;
