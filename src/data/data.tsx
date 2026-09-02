type MessageProp = Record<number, string>;
export const MESSAGES: MessageProp = {
  400: "The request was invalid. Please check your message.",
  401: "You don't have permission to access. Please check your API token.",
  403: "You don't have permission to access this resource.",
  404: "The requested resource was not found.",
  408: "The request timed out. Please try again.",
  429: "Too many requests. Please wait and try again.",
  500: "The AI service is not available. Please, try again after sometime.",
  502: "The AI service is temporarily unavailable. Please, try again after sometime.",
  503: "The AI service is currently unavailable. Please, try again after sometime.",
  504: "The AI service is currently busy. Please, try again after sometime.",
  100: "Something went wrong.Please, try again later.",
};

export const response = {
  service_tier: "default",
  id: "chatcmpl-RsVkZEwHf6c4in0mUzaERiys",
  object: "chat.completion",
  created: 1788313581,
  model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content:
          "There are several reasons why you might not be able to see colors in light, and I'll outline some possible explanations:\n\n1. **Color vision deficiency (CVD)**: This is a condition where a person has difficulty perceiving certain colors, often due to a genetic mutation. It's relatively rare, affecting about 8% of the population. If you suspect you might have CVD, consult an eye care professional for a proper evaluation.\n2. **Visual processing issues**: Some people may have difficulties with visual processing, which can affect color perception. This might be due to:\n\t* **Color blindness**: A condition where the brain has trouble processing colors, particularly red and green.\n\t* **Anisometropia**: A condition where the two eyes have different refractive powers, which can affect color perception.\n\t* **Visual field defects**: Damage to the visual cortex or retina can lead to color perception difficulties.\n3. **Eye conditions**: Certain eye conditions can impact color vision, such as:\n\t* **Age-related macular degeneration**: A condition that affects the macula, the part of the retina responsible for central vision and color perception.\n\t* **Diabetic retinopathy**: A complication of diabetes that can cause damage to the blood vessels in the retina, leading to color vision problems.\n4. **Medical conditions**: Certain medical conditions can affect color vision, such as:\n\t* **Anemia**: A condition where the body lacks sufficient iron, which can cause color vision difficulties.\n\t* **Glaucoma**: A condition that can damage the optic nerve and affect color perception.\n5. **Psychological factors**: Color perception can be influenced by psychological factors, such as:\n\t* **Color constancy**: A phenomenon where the brain adjusts color perception based on the surrounding environment.\n\t* **Attention and perception**: Our attention and focus can affect how we perceive colors.\n6. **Lack of exposure to colors**: If you're not exposed to a wide range of colors in your daily life, you might not be able to perceive them as well.\n7. **Aging and wear and tear**: As we age, our color perception can decline due to the natural aging process and wear and tear on our eyes.\n\nIf you're concerned about your color perception, it's always a good idea to consult an eye care professional for a thorough evaluation. They can assess your color vision and identify any underlying conditions that might be contributing to your difficulties.",
        reasoning_content: null,
        name: null,
        tool_calls: null,
      },
      finish_reason: "stop",
      logprobs: null,
    },
  ],
  usage: {
    prompt_tokens: 17,
    total_tokens: 515,
    completion_tokens: 498,
    estimated_cost: 2.026e-5,
    prompt_tokens_details: null,
  },
};
