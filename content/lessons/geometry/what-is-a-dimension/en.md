---
title: What is a dimension?
summary: A dimension is one direction you can move in. Count how many numbers it takes to say where something is, and you have counted its dimensions.
parameters:
  n: n — how many directions the thing can move in (1 is a track, 2 is a sea, 3 is the sky)
  x: x — how far along the first direction (east, or kilometres along the track)
  y: y — how far along the second direction (north); it does nothing when n is 1
  z: z — how high up; it does nothing when n is 1 or 2
variables:
  - the place where the thing is
  - the first number of the address (how far east)
  - the second number (how far north)
  - the third number (how high)
  - how many numbers the address needs, which is the number of dimensions
---

## Try it

1. Set n to 1 and drag the train. Only one number changes. Then set n to 2 and drag the ship: now there are two. Set n to 3 and the plane needs a third number, the height.
2. Set n to 2 and drag the ship to (2, 8). Read the address in big letters and check the two numbers.
3. Set n to 3. Drag the plane across the floor, then move the z slider. The dashed line is the plane's shadow point, and it shows that the height is a separate number.

## Real-life examples

- **A train on a track.** The driver only needs to say "kilometre 37". One number is enough, because the train can only go forwards or backwards. That is one dimension.
- **A ship at sea.** One number is not enough: "12 km east" could be anywhere along a whole line. Say "12 km east and 5 km north" and the ship has one exact place. That is two dimensions.
- **A plane in the sky.** East and north are not enough, because the plane could be low or high above that spot. Add the height, say 9 km, and you have three numbers.

## Test yourself

1. Put the ship at (2, 8). What do you set n to, and why?
2. Fly the plane at height 5, straight above the point (4, 4).
3. Show something that needs only one number, at 7.

## Intuition

A train runs on a track from one town to the next. If you ask the driver "where are you?", one number is enough: "kilometre 37". The train cannot go left or right, only forwards or backwards. One free direction means one number, and we call that one dimension. In the picture, set n to 1 and drag the train along the track. The y and z sliders do nothing, because a train cannot leave its track.

Now take a ship at sea. "I am 12 km east of the harbour" is not enough, because the ship could be anywhere along that line. You also need "and 5 km north". Two numbers give one exact place, since the sea has two free directions: east-west and north-south. Set n to 2. A ship has a place on the map, and dashed lines run from it to the two axes. Drag the ship and watch both numbers change.

A plane needs three numbers. East and north tell you which spot of the ground it is above. Then you add the height: 9 km. Set n to 3 and drag the plane over the floor of the box. The dashed line to the floor is its shadow point, which has the same east and north but no height. So the number of dimensions is the number of numbers you need to say exactly where something is.

What about meeting a friend? "At the corner of the market, on the third floor" is three numbers, and your friend still does not know when to come. You must also say "at 5 o'clock". Time is a fourth number. You cannot walk back and forth in time as you can in a street, but it is still one more number you need. And a dot with no room to move at all, like a full stop on a page, needs no numbers. That is zero dimensions.

## Formal

A point $P$ in $n$ dimensions is written as a list of $n$ numbers, its coordinates: $P = (x_1, x_2, \dots, x_n)$. Each number measures the distance along one direction, and the directions are independent: changing one does not change any other.

On a line ($n = 1$) the point is $P = (x_1)$. On a plane ($n = 2$) it is $P = (x_1, x_2)$. In space ($n = 3$) it is $P = (x_1, x_2, x_3)$. A single point with no free direction has $n = 0$ and an empty list.

## Advanced

The number of independent numbers needed to fix a position is called the degrees of freedom of a system. A robot arm with six joints has six, even though it works in a 3D room. A mathematician can also ask for a space with $n = 4$ or $n = 11$ without drawing it, because the list of numbers is all that is needed. The next lessons use exactly that idea.

## Derivation

1. On a line there is one free direction, so one number fixes the point: $n = 1\text{: } P = (x_1)$.
2. On a plane we add a second direction, so two numbers are needed: $n = 2\text{: } P = (x_1, x_2)$.
3. In space we add a third direction, the height, so three numbers are needed: $n = 3\text{: } P = (x_1, x_2, x_3)$.

## Real world

### A street address

A house is found with two numbers: the street and the number on the door. It works like a point on a map.

### GPS

Your phone finds you with latitude, longitude and height above the sea. Three numbers, so three dimensions.

### A pixel on a screen

Every dot on a screen is named by two numbers: its column and its row. That is why a screen is a two-dimensional picture.

### An appointment

A meeting needs a place and a time. The place is two or three numbers and the time is one more, so the whole appointment is a point with four numbers.
