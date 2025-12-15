const SectionWrapper = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      {children}
    </div>
  )
}

export default SectionWrapper