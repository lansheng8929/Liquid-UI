import React, { useRef } from "react"
import "./button.css"
import ReactDOM from "react-dom"

interface ButtonProps {
  className?: string
  style?: Record<string, string>
  isDev?: boolean
  variants?: "Primary" | "Secondary"
  label: string
  onClick?: () => void
}

const gradientTheme = [
  {
    gradient: ["rgb(230, 53, 17)", "rgb(230, 53, 17, 0.3)"],
    size: "200% 200%",
    position: "80% 80%",
    animation: [
      {
        key: "50%",
        size: "200% 200%",
        position: "20% 20%",
      },
    ],
  },
  {
    gradient: ["rgb(255, 243, 18)", "rgb(255, 243, 18, 0.8)"],
    size: "200% 200%",
    position: "20% 20%",
    animation: [
      {
        key: "50%",
        size: "200% 200%",
        position: "80% 80%",
      },
    ],
  },
  // {
  //   gradient:
  //     "radial-gradient(closest-side,rgb(255, 0, 0),rgb(235, 105, 78, 0))",
  //   size: "25vw 10vh",
  //   position: "0 0",
  //   animation: [
  //     {
  //       key: "33%",
  //       size: "25vw 33vh",
  //       position: "50% 50%",
  //     },
  //     {
  //       key: "77%",
  //       size: "15vw 20vh",
  //       position: "80% -100%",
  //     },
  //   ],
  // },
]

export const Button = ({
  className = "",
  label,
  isDev = false,
  variants = "Primary",
  style = {},
  ...props
}: ButtonProps) => {
  const [isHover, setIsHover] = React.useState(false)

  const backgroundImage = gradientTheme
    .map(
      (item) =>
        `radial-gradient(closest-side,${item.gradient[0]},${item.gradient[1]})`
    )
    .join(",")
  const backgroundSize = gradientTheme.map((item) => item.size).join(",")
  const backgroundPosition = gradientTheme
    .map((item) => item.position)
    .join(",")
  // 拼装keyframes字符串
  const keys = gradientTheme.map((item) =>
    item.animation.map((item) => item.key)
  )
  const animationKey = keys.reduce(
    (prev, cur, index, arr) => cur.filter((item) => prev.includes(item)),
    keys[0]
  )
  const keyframes = animationKey.map((aniKey) => {
    const backgroundSize = gradientTheme
      .map((item) => item.animation.find((item) => item.key === aniKey)?.size)
      .join(",")
    const backgroundPosition = gradientTheme
      .map(
        (item) => item.animation.find((item) => item.key === aniKey)?.position
      )
      .join(",")

    return `${aniKey}{background-size:${backgroundSize};background-position:${backgroundPosition}}`
  })

  if (!animationKey.includes("0%")) keyframes.unshift("0%{}")
  if (!animationKey.includes("100%")) keyframes.push("100%{}")
  // 拼装keyframes字符串 结束

  const variantsStyle = (): React.CSSProperties => {
    const pubilcStyle: React.CSSProperties = {
      position: "relative",
      backgroundImage: backgroundImage,
      backgroundSize: backgroundSize,
      backgroundPosition: backgroundPosition,
      backgroundRepeat: "no-repeat",
    }
    const shadowColor = gradientTheme[0].gradient[0].slice(4, -1)

    switch (variants) {
      case "Primary":
        return {
          ...pubilcStyle,
          boxShadow: `0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(${shadowColor},0.4),0 4px 6px -4px rgb(${shadowColor},0.4)`,
          animation: "10s moiveAnimation infinite",
        }

      case "Secondary":
        return {
          ...pubilcStyle,
        }

      default:
        return {
          ...pubilcStyle,
          animation: "10s moiveAnimation infinite",
        }
    }
  }

  function showColor() {
    return gradientTheme.map((item, index) => (
      <div
        key={index}
        style={{
          width: "10px",
          height: "10px",
          backgroundImage: `radial-gradient(closest-side,${item.gradient[0]},${item.gradient[1]})`,
        }}
      ></div>
    ))
  }

  React.useEffect(() => {
    // console.log(`@keyframes moiveAnimation {${keyframes.join("")}}`)
    document.styleSheets[0].insertRule(
      `@keyframes moiveAnimation {${keyframes.join("")}}`
    )
  }, [])

  return (
    <button
      type="button"
      className={`storybook-button ${className}`}
      style={{
        ...variantsStyle(),
        ...style,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      {label}

      {isDev && (
        <div
          className="storybook-gradient"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            visibility: isHover ? "visible" : "hidden",
            opacity: isHover ? 1 : 0,
            transition: "all 0.5s ease-in-out",
            ...variantsStyle,
          }}
        >
          gradient
          {showColor()}
        </div>
      )}
    </button>
  )
}
