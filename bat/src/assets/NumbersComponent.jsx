import React, { useEffect } from 'react'

function NumbersComponent({ nums, setNums, handleNumClick, areButtonsDisabled, finalNumCheck }) {
  useEffect(() => {
    
      Object.keys(nums).forEach((index) => {
        const num = nums[index]
        if (!num.show) {
          setTimeout(() => {
            setNums((prevNums) => {
              const updatedNums = { ...prevNums }
              updatedNums[index] = { ...updatedNums[index], show: true }
              return updatedNums
            })
          }, num.delay)
        }
      })
    
  }, [nums])

  return (
    <div className="numbers">
      {Object.keys(nums).map((index) => {
        const num = nums[index]
        let classNames = num.isEnabled ? 'num-box' : 'num-box-disabled'

        return (
          <button
            key={index}
            value={num.value}
            onClick={() => handleNumClick(num.value, index)}
            disabled={!num.isEnabled || areButtonsDisabled || !finalNumCheck}
            className={num.value === 0 ? `${classNames} num-box-noCursor` : classNames}
          >
            {num.value === 0 ? '' : num.show ? num.value : '?'}
          </button>
        )
      })}
    </div>
  )
}

export default NumbersComponent
