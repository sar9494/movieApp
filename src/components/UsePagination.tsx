import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  type props={
    step:number,
    setStep:Function
  }
export const UsePagination = (props:props) => {
    const {setStep,step}=props
    return(
        <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                step != 1 && setStep(step - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive onClick={()=>{setStep(step)}}>
              {step}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={()=>{setStep(step+1)}}>
              {step+1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={()=>{setStep(step+2)}}>{step+2}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#"
              onClick={() => {
                setStep(step + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
}