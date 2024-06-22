interface ProbabilityLabelProps {
  validWorlds: number;
  totalWorlds: number;
}

export default function ProbabilityLabel(props: ProbabilityLabelProps) {
  const { validWorlds, totalWorlds } = props;

  if (totalWorlds === 0) return <div className="tag is-danger">Invalid</div>;

  const result = validWorlds / totalWorlds;
  const resultString = new Intl.NumberFormat("en-IN", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(result);

  const style =
    result >= 0.5
      ? result >= 0.75
        ? "is-danger"
        : "is-warning"
      : validWorlds == 0
      ? "is-success"
      : "";

  return (
    <div className={"tag " + style}>
      {resultString + " (" + validWorlds + ")"}
    </div>
  );
}
