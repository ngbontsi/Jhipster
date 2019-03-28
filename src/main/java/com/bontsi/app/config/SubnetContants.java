package com.bontsi.app.config;

public enum SubnetContants {

	DAS(6),VIP(9),IPv6(2),AFRINIC(4),Customers(1),ServiceProviders(7),Circuirts_Interconnects(5);
	int value;

	SubnetContants(int value){
		this.value = value;

	}

}
