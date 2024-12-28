interface IconProps {
  color: string;
}

export const DesignerIcon = ({ color }: IconProps) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.8535 6.98182C15.4649 4.96104 14.3105 3.16795 12.6309 1.9762C10.9514 0.784444 8.8761 0.285959 6.8376 0.584617C4.7991 0.883275 2.95462 1.95604 1.68851 3.57936C0.422403 5.20269 -0.167671 7.25135 0.0412508 9.29845C0.193531 10.6661 0.69326 11.9722 1.493 13.0928C2.29274 14.2134 3.36596 15.1112 4.61079 15.7011C5.65615 16.2164 6.80445 16.4895 7.97015 16.5H7.97975C8.29814 16.5013 8.61364 16.4396 8.90799 16.3184C9.20234 16.1972 9.46971 16.0189 9.69462 15.7938C9.91863 15.5729 10.0964 15.3096 10.2177 15.0194C10.3389 14.7293 10.4012 14.4179 10.4009 14.1035V13.4165C10.39 13.3035 10.4024 13.1895 10.4373 13.0815C10.4722 12.9735 10.5288 12.8738 10.6038 12.7885C10.6787 12.7032 10.7703 12.6341 10.873 12.5855C10.9756 12.5369 11.0872 12.5097 11.2007 12.5058H13.3603C13.8609 12.5089 14.3496 12.3543 14.7571 12.064C15.1647 11.7738 15.4702 11.3626 15.6303 10.8889C16.0305 9.62567 16.1072 8.28235 15.8535 6.98182ZM3.60218 9.31044C3.44398 9.31044 3.28934 9.26359 3.1578 9.17581C3.02627 9.08803 2.92375 8.96327 2.86321 8.8173C2.80267 8.67133 2.78683 8.51071 2.8177 8.35575C2.84856 8.20079 2.92474 8.05845 3.0366 7.94673C3.14846 7.83501 3.29098 7.75893 3.44613 7.72811C3.60129 7.69729 3.76211 7.71311 3.90826 7.77357C4.05442 7.83403 4.17934 7.93642 4.26723 8.06779C4.35511 8.19916 4.40202 8.3536 4.40202 8.5116C4.40202 8.72346 4.31776 8.92665 4.16775 9.07646C4.01775 9.22627 3.81431 9.31044 3.60218 9.31044ZM5.76737 6.28044C5.65552 6.39219 5.513 6.46829 5.35783 6.49914C5.20267 6.52998 5.04184 6.51417 4.89567 6.45372C4.7495 6.39326 4.62457 6.29087 4.53667 6.1595C4.44877 6.02813 4.40185 5.87367 4.40185 5.71567C4.40185 5.55766 4.44877 5.4032 4.53667 5.27183C4.62457 5.14046 4.7495 5.03807 4.89567 4.97761C5.04184 4.91716 5.20267 4.90135 5.35783 4.93219C5.513 4.96304 5.65552 5.03914 5.76737 5.15089C5.91731 5.30069 6.00155 5.50384 6.00155 5.71567C6.00155 5.92749 5.91731 6.13064 5.76737 6.28044ZM8.06453 4.98313C7.90634 4.98313 7.75169 4.93628 7.62016 4.8485C7.48863 4.76073 7.38611 4.63596 7.32557 4.49C7.26503 4.34403 7.24919 4.18341 7.28005 4.02845C7.31091 3.87349 7.38709 3.73115 7.49895 3.61943C7.61081 3.50771 7.75333 3.43163 7.90849 3.4008C8.06364 3.36998 8.22447 3.3858 8.37062 3.44626C8.51677 3.50673 8.64169 3.60911 8.72958 3.74048C8.81747 3.87185 8.86438 4.0263 8.86438 4.18429C8.86438 4.39616 8.78011 4.59935 8.63011 4.74916C8.48011 4.89897 8.27666 4.98313 8.06453 4.98313ZM11.3663 6.28044C11.2545 6.39219 11.1119 6.46829 10.9568 6.49914C10.8016 6.52998 10.6408 6.51417 10.4946 6.45372C10.3484 6.39326 10.2235 6.29087 10.1356 6.1595C10.0477 6.02813 10.0008 5.87367 10.0008 5.71567C10.0008 5.55766 10.0477 5.4032 10.1356 5.27183C10.2235 5.14046 10.3484 5.03807 10.4946 4.97761C10.6408 4.91716 10.8016 4.90135 10.9568 4.93219C11.1119 4.96304 11.2545 5.03914 11.3663 5.15089C11.5163 5.30069 11.6005 5.50384 11.6005 5.71567C11.6005 5.92749 11.5163 6.13064 11.3663 6.28044Z"
        fill={color}
      />
    </svg>
  );
};