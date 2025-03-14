import Button from "@/app/components/ui/Button/Button";
import React from "react";
import { Text } from "lucide-react";
import { useMenuFacade } from "@/facades/useMenuFacade";
import { EButtonSizes, EButtonVariants } from "@/types/ui";

const MobileMenuButton = () => {
	const { toggleMenu } = useMenuFacade();
	return (
		<Button
			size={EButtonSizes.SMALL}
			variant={EButtonVariants.OUTLINE}
			onClick={toggleMenu}
			
		>
			<Text />
		</Button>
	);
};

export default MobileMenuButton;
