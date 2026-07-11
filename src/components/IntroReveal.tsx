"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

/**
 * #1 — Page reveal de entrada.
 * Cortina abissal com mesh de aurora + ícone da marca que respira;
 * depois sobe revelando a intro (logo-reveal). Evita o "flash"/pop do
 * vídeo carregando e dá sensação de produto caro.
 * Trava o scroll enquanto está visível.
 */
const HOLD_MS = 1100;

export default function IntroReveal() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    window.scrollTo(0, 0);
    const t = setTimeout(() => setShow(false), HOLD_MS);
    return () => clearTimeout(t);
  }, [lenis]);

  // libera o scroll quando a cortina termina de sair
  const onExitDone = () => lenis?.start();

  return (
    <AnimatePresence onExitComplete={onExitDone}>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.4 } }
              : { y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
          }
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-abyss"
        >
          {/* mesh de aurora ao fundo */}
          <div className="aurora-mesh" />

          {/* ícone respirando */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/brand/icon-branco.png"
                alt="STUDIO Aurora"
                width={84}
                height={84}
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
