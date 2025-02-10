import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const UsePagination = ({
  setStep,
  step,
}: {
  step: number;
  setStep: Function;
}) => {
  const onClick = (direction: number) => {
    setStep(step + direction);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onClick(-1)}
            className={`${step == 1 && "hidden"}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            onClick={() => {
              setStep(step);
            }}
          >
            {step}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={() => onClick(1)}>
            {step + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={() => onClick(2)}>
            {step + 2}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={() => onClick(1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};